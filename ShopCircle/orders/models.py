from django.db import models
from products.models import Product
# from django.contrib.auth.models import User
from django.conf import settings
# Create your models here.

User = settings.AUTH_USER_MODEL


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user}'s Cart"
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart,related_name="items",on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return self.product.name
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    STATUS_CHOICE = (
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
    )
    
    total_price = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(max_length=20,choices=STATUS_CHOICE,default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order {self.id} - {self.user}"



class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items",on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10,decimal_places=2)
    
    
    def __str__(self):
        return self.product.name
