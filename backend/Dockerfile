# 1. Base image
FROM python:3.11-slim

# 2. Environment settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Work directory
WORKDIR /app

# 4. Install system packages
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# 5. Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# 6. Copy source code
COPY . /app/

# 7. Create media/static directories
RUN mkdir -p /vol/web/static /vol/web/media

# 8. Optional: collectstatic (for production)
# RUN python manage.py collectstatic --noinput

# 9. Expose port
EXPOSE 8000

# 10. Add entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# 11. Start server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
