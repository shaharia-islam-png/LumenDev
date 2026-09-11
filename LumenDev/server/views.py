from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages

def index(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        sender_email = request.POST.get('email')
        phone = request.POST.get('phone')
        subject = request.POST.get('subject')
        message_body = request.POST.get('message')

        full_message = f"Name: {name}\nEmail: {sender_email}\nPhone: {phone}\n\nMessage:\n{message_body}"

        try:
            send_mail(
                subject=f"New Inquiry: {subject}",
                message=full_message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            messages.success(request, "Your message has been sent successfully!")
        except Exception as e:
            messages.error(request, f"Error sending message: {e}")

        return redirect('home') # Form submit howar por page reload hobe

    return render(request, 'index.html')

def portfolio_details(request):
    return render(request, 'portfolio-details.html')

def privacy(request):
    return render(request, 'privacy.html')

def service_details(request):
    return render(request, 'service-details.html')

def starter_page(request):
    return render(request, 'starter-page.html')

def terms(request):
    return render(request, 'terms.html')