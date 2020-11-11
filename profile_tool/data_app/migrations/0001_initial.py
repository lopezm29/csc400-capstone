# Generated by Django 2.1.5 on 2020-11-05 04:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beach',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Beachsurveymap',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('beach', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Beach')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('section', models.CharField(max_length=3)),
                ('width', models.DecimalField(blank=True, decimal_places=3, max_digits=8)),
                ('volume', models.DecimalField(blank=True, decimal_places=6, max_digits=9)),
            ],
        ),
        migrations.CreateModel(
            name='Profilestationmap',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Reduced',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('true_distance', models.DecimalField(decimal_places=3, max_digits=8)),
                ('true_z', models.DecimalField(decimal_places=3, max_digits=8)),
            ],
        ),
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.IntegerField()),
                ('distance', models.DecimalField(decimal_places=3, max_digits=8)),
                ('z', models.DecimalField(decimal_places=3, max_digits=8)),
                ('comment', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('start_date', models.DateField()),
                ('elevation_control', models.DecimalField(blank=True, decimal_places=3, max_digits=5, null=True)),
                ('mhhw', models.DecimalField(blank=True, decimal_places=3, max_digits=6)),
                ('mllw', models.DecimalField(blank=True, decimal_places=3, max_digits=6)),
            ],
        ),
        migrations.CreateModel(
            name='Surveyprofilemap',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Profile')),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Survey')),
            ],
        ),
        migrations.AddField(
            model_name='reduced',
            name='station',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Station'),
        ),
        migrations.AddField(
            model_name='profilestationmap',
            name='station',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Station'),
        ),
        migrations.AddField(
            model_name='beachsurveymap',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_app.Survey'),
        ),
    ]
