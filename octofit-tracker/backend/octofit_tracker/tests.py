from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(username='testuser', email='test@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='desc')
        self.activity = Activity.objects.create(user=self.user, type='Run', duration=10, distance=1.5)
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=50)

    def test_user(self):
        self.assertEqual(self.user.team.name, 'Test Team')

    def test_activity(self):
        self.assertEqual(self.activity.type, 'Run')

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 50)
