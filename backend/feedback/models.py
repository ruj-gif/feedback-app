from django.db import models

# Create your models here.

class Feedback(models.Model):
    name = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    rating = models.IntegerField()
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def display_name(self):
        return "Anonymous" if self.is_anonymous else self.name

    def __str__(self):
        return f"{self.display_name()} ({self.rating})"