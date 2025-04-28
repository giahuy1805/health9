from django.db import models

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    notes = models.TextField(blank=True, null=True) 
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name