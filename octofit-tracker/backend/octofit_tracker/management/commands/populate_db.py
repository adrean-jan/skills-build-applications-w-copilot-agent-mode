from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from octofit_tracker import models as app_models

from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        app_models.Team.objects.all().delete()
        app_models.Activity.objects.all().delete()
        app_models.Leaderboard.objects.all().delete()
        app_models.Workout.objects.all().delete()

        # Create Teams
        marvel = app_models.Team.objects.create(name='Marvel')
        dc = app_models.Team.objects.create(name='DC')

        # Create Users (Superheroes)
        users = [
            User(email='tony@stark.com', username='IronMan', team=marvel),
            User(email='steve@rogers.com', username='CaptainAmerica', team=marvel),
            User(email='bruce@wayne.com', username='Batman', team=dc),
            User(email='clark@kent.com', username='Superman', team=dc),
        ]
        for user in users:
            user.set_password('password')
            user.save()

        # Create Activities
        activities = [
            app_models.Activity.objects.create(user=users[0], type='Run', duration=30, distance=5),
            app_models.Activity.objects.create(user=users[1], type='Swim', duration=45, distance=2),
            app_models.Activity.objects.create(user=users[2], type='Bike', duration=60, distance=20),
            app_models.Activity.objects.create(user=users[3], type='Run', duration=25, distance=4),
        ]

        # Create Workouts
        workouts = [
            app_models.Workout.objects.create(name='Morning Cardio', description='Cardio for all'),
            app_models.Workout.objects.create(name='Strength Training', description='Strength for all'),
        ]

        # Create Leaderboard
        app_models.Leaderboard.objects.create(team=marvel, points=100)
        app_models.Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
