from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

"""
Root URL Configuration for the Simple Life project.

Includes:
- Admin panel
- API endpoints (v1)
- Media file serving in development
"""

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin interface

    # Main API route (versioned)
    path('api/', include('api.urls')),  # Delegates to the api/urls.py
]

# Serve uploaded media (doctor photos, resumes, etc.) in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
