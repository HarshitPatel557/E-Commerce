from django.urls import path
from . import views

urlpatterns = [
    path('cart/', views.cart_detail),
    path('cart/add/', views.add_to_cart),
    path('cart/update/', views.update_quantity),
]
