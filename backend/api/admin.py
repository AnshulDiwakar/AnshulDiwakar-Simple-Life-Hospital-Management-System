from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Doctor, Patient, Appointment, ContactMessage

#  Customize the User admin
class UserAdmin(BaseUserAdmin):
    model = User

    # Fields to display in the list view
    list_display = (
        'username', 'email', 'full_name', 'gender', 'date_of_birth',
        'is_doctor', 'is_patient', 'is_staff', 'is_active'
    )
    
    # Filters on the right-hand side
    list_filter = (
        'is_doctor', 'is_patient', 'gender',
        'is_staff', 'is_active'
    )

    # Fields for the individual user detail page
    fieldsets = (
        (None, {'fields': ('username', 'password')}),  # Basic login info
        ('Personal Info', {
            'fields': (
                'full_name', 'gender', 'date_of_birth',
                'first_name', 'last_name', 'email',
            )
        }),
        ('Permissions', {
            'fields': (
                'is_doctor', 'is_patient',
                'is_staff', 'is_active',
                'groups', 'user_permissions',
            )
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
    )

    # Fields used when creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'full_name', 'gender', 'date_of_birth',
                'password1', 'password2',
                'is_doctor', 'is_patient',
                'is_staff', 'is_active',
            ),
        }),
    )

    search_fields = ('username', 'email', 'full_name')  # Enables admin search
    ordering = ('username',)  # Default ordering


#  Doctor admin customization
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'price')  # Shows doctor info
    search_fields = ('user__username', 'specialization')
    list_filter = ('specialization',)


#  Patient admin customization
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone')  # Shows patient info
    search_fields = ('user__username', 'phone')


#  Appointment admin customization
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'email', 'doctor', 'date', 'time')
    list_filter = ('date', 'doctor')
    search_fields = ('patient_name', 'email')


#  ContactMessage admin customization
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')


#  Registering all models with custom admin classes
admin.site.register(User, UserAdmin)
admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)
