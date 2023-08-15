from django.db import models

# Create your models here.
class Images(models.Model):
    label = models.CharField(max_length=50)
    url = models.URLField(max_length=200)