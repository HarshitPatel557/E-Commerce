from django.urls import path
from . import views

urlpatterns = [
    path('cart/', views.cart_detail),
    path('cart/add/', views.add_to_cart),
    path('cart/update/', views.update_quantity),
    path('cart/delete/', views.delete_cart_item),
    path('checkout/', views.checkout),
]
