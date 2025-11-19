import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:animate_do/animate_do.dart';
import 'package:go_router/go_router.dart';
import '../../../../shared/domain/models/verse_activity.dart';
import '../providers/verse_activity_provider.dart';

class VerseActivitiesPage extends ConsumerWidget {
  final String chapterId;
  final int verseNumber;

  const VerseActivitiesPage({
    super.key,
    required this.chapterId,
    required this.verseNumber,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activitiesAsync = ref.watch(
      verseActivitiesProvider((chapterId: chapterId, verseNumber: verseNumber)),
    );

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 180,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                'Activities & Experiments',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  shadows: [
                    Shadow(
                      offset: const Offset(0, 1),
                      blurRadius: 3.0,
                      color: Colors.black.withOpacity(0.5),
                    ),
                  ],
                ),
              ),
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Theme.of(context).colorScheme.primary,
                      Theme.of(context).colorScheme.secondary,
                    ],
                  ),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      right: -50,
                      top: -50,
                      child: Icon(
                        Icons.science_outlined,
                        size: 200,
                        color: Colors.white.withOpacity(0.1),
                      ),
                    ),
                    Positioned(
                      left: -30,
                      bottom: -30,
                      child: Icon(
                        Icons.auto_awesome,
                        size: 150,
                        color: Colors.white.withOpacity(0.1),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          activitiesAsync.when(
            data: (activities) {
              if (activities.isEmpty) {
                return SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.science_outlined,
                          size: 80,
                          color: Colors.grey[400],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'No activities available yet',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.grey[600],
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Check back later for new experiments!',
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey[500],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final activity = activities[index];
                    return FadeInUp(
                      delay: Duration(milliseconds: 40 * index),
                      duration: const Duration(milliseconds: 300),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16.0,
                          vertical: 8.0,
                        ),
                        child: VerseActivityCard(
                          activity: activity,
                          onTap: () {
                            context.push(
                              '/chapter/$chapterId/verse/$verseNumber/activity/${activity.id}',
                            );
                          },
                        ),
                      ),
                    );
                  },
                  childCount: activities.length,
                ),
              );
            },
            loading: () => const SliverFillRemaining(
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (error, stack) => SliverFillRemaining(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.error_outline, size: 60, color: Colors.red[300]),
                    const SizedBox(height: 16),
                    Text(
                      'Failed to load activities',
                      style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                    ),
                    const SizedBox(height: 8),
                    ElevatedButton.icon(
                      onPressed: () => ref.refresh(
                        verseActivitiesProvider((chapterId: chapterId, verseNumber: verseNumber)),
                      ),
                      icon: const Icon(Icons.refresh),
                      label: const Text('Retry'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class VerseActivityCard extends StatelessWidget {
  final VerseActivity activity;
  final VoidCallback onTap;

  const VerseActivityCard({
    super.key,
    required this.activity,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: _getActivityColor(activity.type).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      _getActivityIcon(activity.type),
                      color: _getActivityColor(activity.type),
                      size: 28,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          activity.title,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          _getActivityTypeLabel(activity.type),
                          style: TextStyle(
                            fontSize: 12,
                            color: _getActivityColor(activity.type),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                activity.description,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[700],
                  height: 1.4,
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 16),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  _InfoChip(
                    icon: Icons.timer_outlined,
                    label: activity.duration,
                    color: Colors.blue,
                  ),
                  _InfoChip(
                    icon: Icons.trending_up,
                    label: activity.difficulty.name.toUpperCase(),
                    color: _getDifficultyColor(activity.difficulty),
                  ),
                  _InfoChip(
                    icon: Icons.list_alt,
                    label: '${activity.instructions.length} steps',
                    color: Colors.purple,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  IconData _getActivityIcon(VerseActivityType type) {
    switch (type) {
      case VerseActivityType.experiment:
        return Icons.science;
      case VerseActivityType.meditation:
        return Icons.self_improvement;
      case VerseActivityType.reflection:
        return Icons.psychology;
      case VerseActivityType.practice:
        return Icons.fitness_center;
      case VerseActivityType.journaling:
        return Icons.edit_note;
      case VerseActivityType.dailyChallenge:
        return Icons.star;
    }
  }

  Color _getActivityColor(VerseActivityType type) {
    switch (type) {
      case VerseActivityType.experiment:
        return Colors.green;
      case VerseActivityType.meditation:
        return Colors.purple;
      case VerseActivityType.reflection:
        return Colors.blue;
      case VerseActivityType.practice:
        return Colors.orange;
      case VerseActivityType.journaling:
        return Colors.teal;
      case VerseActivityType.dailyChallenge:
        return Colors.amber;
    }
  }

  String _getActivityTypeLabel(VerseActivityType type) {
    switch (type) {
      case VerseActivityType.experiment:
        return 'EXPERIMENT';
      case VerseActivityType.meditation:
        return 'MEDITATION';
      case VerseActivityType.reflection:
        return 'REFLECTION';
      case VerseActivityType.practice:
        return 'PRACTICE';
      case VerseActivityType.journaling:
        return 'JOURNALING';
      case VerseActivityType.dailyChallenge:
        return 'DAILY CHALLENGE';
    }
  }

  Color _getDifficultyColor(ActivityDifficulty difficulty) {
    switch (difficulty) {
      case ActivityDifficulty.beginner:
        return Colors.green;
      case ActivityDifficulty.intermediate:
        return Colors.orange;
      case ActivityDifficulty.advanced:
        return Colors.red;
    }
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;

  const _InfoChip({
    required this.icon,
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
