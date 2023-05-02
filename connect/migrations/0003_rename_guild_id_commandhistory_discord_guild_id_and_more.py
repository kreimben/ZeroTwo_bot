# Generated by Django 4.2 on 2023-05-02 07:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('socialaccount', '0003_extra_data_default_dict'),
        ('connect', '0002_alter_commandhistory_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commandhistory',
            old_name='guild_id',
            new_name='discord_guild_id',
        ),
        migrations.RenameField(
            model_name='commandhistory',
            old_name='user_id',
            new_name='discord_user_id',
        ),
        migrations.AddField(
            model_name='commandhistory',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='socialaccount.socialaccount'),
            preserve_default=False,
        ),
    ]
