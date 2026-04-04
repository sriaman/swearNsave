FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=sweatnsave_django.settings

WORKDIR /app

RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

# Install gunicorn (add to requirements.txt too)
CMD ["sh", "-c", "python manage.py migrate && gunicorn sweatnsave_django.wsgi:application --bind 0.0.0.0:$PORT"]