from django.db import models 
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# 1. Custom User Model (extended from Django's AbstractUser)
class User(AbstractUser):
    is_doctor = models.BooleanField(default=False, help_text="Designates whether the user is a doctor.")
    is_patient = models.BooleanField(default=False, help_text="Designates whether the user is a patient.")
    full_name = models.CharField(max_length=150, blank=True, help_text="Full name of the user.")
    gender = models.CharField(
        max_length=10,
        choices=[("male", "Male"), ("female", "Female"), ("other", "Other")],
        null=True,
        blank=True,
        help_text="User's gender."
    )
    date_of_birth = models.DateField(null=True, blank=True, help_text="User's date of birth.")

    # Override groups field to avoid related name clashes
    groups = models.ManyToManyField(
        Group,
        related_name='api_user_set',
        blank=True,
        help_text=_('The groups this user belongs to. A user will get all permissions granted to each group.'),
        related_query_name='user',
        verbose_name=_('groups'),
    )

    # Override permissions field to avoid related name clashes
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='api_user_set',
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_query_name='user',
        verbose_name=_('user permissions'),
    )

    def __str__(self):
        return self.username


# 2. Doctor Profile Model
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100, help_text="Doctor's area of specialization.")
    photo = models.ImageField(upload_to='doctor_photos/', null=True, blank=True)
    resume = models.FileField(upload_to='doctor_resumes/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Consultation price.")

    def __str__(self):
        return f"Dr. {self.user.full_name or self.user.username}"


# 3. Patient Profile Model
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    phone = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$', message="Enter a valid phone number.")],
        help_text="Patient's contact number."
    )

    def __str__(self):
        return self.user.full_name or self.user.username


# 4. Appointment Model
class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField(help_text="Date of appointment.")
    time = models.TimeField(help_text="Time of appointment.")
    description = models.TextField(blank=True, help_text="Additional notes or symptoms.")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')

    def __str__(self):
        return f"Appointment with {self.doctor.user.username} on {self.date} at {self.time}"


# 5. Contact Message Model
class ContactMessage(models.Model):
    name = models.CharField(max_length=100, help_text="Name of the person contacting.")
    email = models.EmailField(help_text="Email address of the person.")
    message = models.TextField(help_text="Content of the message.")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Time the message was created.")

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
