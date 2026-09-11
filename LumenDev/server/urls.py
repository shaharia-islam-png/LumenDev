from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('portfolio-details/', views.portfolio_details, name='portfolio-details'),
    path('privacy/', views.privacy, name='privacy'),
    path('service-details/', views.service_details, name='service-details'),
    path('starter-page/', views.starter_page, name='starter-page'),
    path('terms/', views.terms, name='terms'),
]