import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../theme/app_theme.dart';
import '../../shared/domain/models/activity.dart';

class ActivityCard extends StatelessWidget {
  final Activity activity;
  final String chapterId;

  const ActivityCard({
    super.key,
    required this.activity,
    required this.chapterId,
  });

  IconData _getActivityIcon() {
    switch (activity.type) {
      case ActivityType.read:
        return Icons.menu_book;
      case ActivityType.watch:
        return Icons.play_circle_filled;
      case ActivityType.experiments:
        return Icons.science;
      case ActivityType.listen:
        return Icons.headphones;
      case ActivityType.quiz:
        return Icons.quiz;
      case ActivityType.reflection:
        return Icons.edit_note;
      case ActivityType.discussion:
        return Icons.forum;
      case ActivityType.dailyVerse:
        return Icons.today;
    }
  }

  Color _getActivityColor() {
    switch (activity.type) {
      case ActivityType.watch:
        return AppTheme.primaryOrange;
      case ActivityType.experiments:
        return Colors.green;
      case ActivityType.listen:
        return AppTheme.accentPurple;
      case ActivityType.quiz:
        return AppTheme.accentBlue;
      default:
        return AppTheme.primaryDeepOrange;
    }
  }

  void _handleActivityTap(BuildContext context) {
    switch (activity.type) {
      case ActivityType.watch:
        // Navigate to verse list page
        context.push('/chapter/$chapterId/verses');
        break;
      case ActivityType.experiments:
        // Navigate to chapter activities page (verse-wise activities)
        context.push('/chapter/$chapterId/activities');
        break;
      case ActivityType.read:
        // Navigate to reading view
        _showComingSoonDialog(context, 'Reading View');
        break;
      case ActivityType.listen:
        // Navigate to audio player
        _showComingSoonDialog(context, 'Audio Player');
        break;
      case ActivityType.quiz:
        // Navigate to quiz
        _showComingSoonDialog(context, 'Quiz');
        break;
      case ActivityType.reflection:
        // Navigate to reflection notes
        _showComingSoonDialog(context, 'Reflection Notes');
        break;
      case ActivityType.discussion:
        // Navigate to discussion forum
        _showComingSoonDialog(context, 'Discussion Forum');
        break;
      case ActivityType.dailyVerse:
        // Show daily verse
        _showComingSoonDialog(context, 'Daily Verse');
        break;
    }
  }

  void _showComingSoonDialog(BuildContext context, String feature) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(_getActivityIcon(), color: _getActivityColor()),
            const SizedBox(width: 12),
            Expanded(child: Text(activity.title)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              activity.description,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.accentBlue.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.construction,
                    color: AppTheme.accentBlue,
                    size: 20,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      '$feature is coming soon!',
                      style: TextStyle(
                        color: AppTheme.accentBlue,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final color = _getActivityColor();

    return GestureDetector(
      onTap: () {
        _handleActivityTap(context);
      },
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              // Activity Icon
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  _getActivityIcon(),
                  color: color,
                  size: 28,
                ),
              ),

              const SizedBox(width: 16),

              // Activity Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      activity.title,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      activity.description,
                      style: Theme.of(context).textTheme.bodySmall,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    
                    // Progress bar if applicable
                    if (activity.completionPercentage != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: activity.completionPercentage! / 100,
                            backgroundColor: Colors.grey[200],
                            valueColor: AlwaysStoppedAnimation<Color>(color),
                            minHeight: 6,
                          ),
                        ),
                      ),
                  ],
                ),
              ),

              const SizedBox(width: 12),

              // Status Icon
              if (activity.isCompleted)
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.green.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.check_circle,
                    color: Colors.green,
                    size: 20,
                  ),
                )
              else
                Icon(
                  Icons.arrow_forward_ios,
                  size: 16,
                  color: Colors.grey[400],
                ),
            ],
          ),
        ),
      ),
    );
  }
}
