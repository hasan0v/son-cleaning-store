'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/validators'
import { submitContactAction } from '@/actions/contact'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  getEmailJSConfig, 
  isEmailJSConfigValid, 
  getEmailJSErrorMessage,
  logEmailJSError
} from '@/lib/email-debug'

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isEmailSending, setIsEmailSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    startTransition(async () => {
      try {
        // Save to database first
        const formData = new FormData()
        
        // Only append non-empty values
        formData.append('name', data.name.trim())
        if (data.company?.trim()) formData.append('company', data.company.trim())
        if (data.email?.trim()) formData.append('email', data.email.trim())
        if (data.phone?.trim()) formData.append('phone', data.phone.trim())
        formData.append('message', data.message.trim())

        const result = await submitContactAction(formData)
        
        if (!result.success) {
          toast.error(result.message)
          return
        }

        // Send emails via EmailJS if configured
        const emailConfig = getEmailJSConfig()

        if (isEmailJSConfigValid(emailConfig)) {
          setIsEmailSending(true)
          
          try {
            // Prepare and validate template variables
            const currentDate = new Intl.DateTimeFormat('az-AZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Baku'
            }).format(new Date())

            // Validate email format if provided
            const customerEmail = data.email?.trim()
            const isValidEmail = customerEmail && customerEmail.includes('@') && customerEmail.includes('.')

            const emailTemplateParams = {
              from_name: data.name.trim(),
              company: data.company?.trim() || 'Qeyd edilməyib',
              reply_to: isValidEmail ? customerEmail : 'noreply@example.com',
              phone: data.phone?.trim() || 'Telefon verilməyib',
              message: data.message.trim(),
              to_name: 'SON Təmizlik Məhsulları',
              current_date: currentDate,
              message_id: result.id?.toString() || 'unknown'
            }
            
            // Send admin notification email
            await emailjs.send(
              emailConfig.serviceId!,
              emailConfig.templateId!,
              emailTemplateParams,
              emailConfig.publicKey!
            )

            // Send customer auto-reply email if they provided a valid email and auto-reply template exists
            if (isValidEmail && emailConfig.autoReplyTemplateId) {
              try {
                // Create separate parameters for auto-reply (customer receives the email)
                const autoReplyParams = {
                  ...emailTemplateParams,
                  to_email: customerEmail, // Customer's email as recipient
                  to_name: data.name.trim(), // Customer's name as recipient name
                  customer_name: data.name.trim(), // For personalization in template
                }
                
                await emailjs.send(
                  emailConfig.serviceId!,
                  emailConfig.autoReplyTemplateId,
                  autoReplyParams,
                  emailConfig.publicKey!
                )
              } catch (autoReplyError) {
                logEmailJSError(autoReplyError, 'Customer auto-reply email')
                // Don't show error to user for auto-reply failure
              }
            }
            
            toast.success('Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.')
          } catch (emailError) {
            logEmailJSError(emailError, 'Admin notification email')
            const errorMessage = getEmailJSErrorMessage({ status: (emailError as Record<string, unknown>)?.status as number })
            toast.success(errorMessage)
          } finally {
            setIsEmailSending(false)
          }
        } else {
          toast.success(result.message)
        }

        reset()
      } catch (error) {
        console.error('Form submission error:', error)
        toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.')
      }
    })
  }

  const isLoading = isPending || isEmailSending

  const field = 'h-12 rounded-xl border-input bg-slate-50/60 px-4 text-base shadow-none transition-colors focus-visible:border-brand-blue focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand-sky/15 md:text-[0.95rem]'
  const invalid = 'border-destructive/60 bg-red-50/40'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`space-y-5 ${className}`}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-brand-ink">
            Ad, soyad <span className="text-brand-red">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Adınız və soyadınız"
            aria-invalid={!!errors.name}
            {...register('name')}
            className={cn(field, errors.name && invalid)}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium text-brand-ink">Şirkət</Label>
          <Input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Şirkət adı (istəyə bağlı)"
            {...register('company')}
            className={field}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-brand-ink">E-poçt</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="ad@nümunə.az"
            aria-invalid={!!errors.email}
            {...register('email')}
            className={cn(field, errors.email && invalid)}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-brand-ink">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+994 XX XXX XX XX"
            {...register('phone')}
            className={field}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-brand-ink">
          Mesaj <span className="text-brand-red">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Hansı məhsullar və hansı həcmdə maraqlandırır?"
          rows={5}
          aria-invalid={!!errors.message}
          {...register('message')}
          className={cn(field, 'h-auto min-h-36 py-3', errors.message && invalid)}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          <span className="text-brand-red">*</span> Məcburi sahələr
        </p>
        <button type="submit" disabled={isLoading} className="btn-primary w-full !py-3.5 sm:w-auto sm:!px-8">
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {isEmailSending ? 'E-poçt göndərilir…' : 'Göndərilir…'}
            </>
          ) : (
            <>
              Mesaj göndər
              <Send className="size-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
