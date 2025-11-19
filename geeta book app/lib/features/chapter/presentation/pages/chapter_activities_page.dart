import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:animate_do/animate_do.dart';
import 'package:go_router/go_router.dart';
import '../../../../shared/domain/models/verse_activity.dart';
import '../../../../shared/domain/models/verse.dart';
import '../../../verse/presentation/providers/verse_activity_provider.dart';
import '../../../../shared/providers/verses_provider.dart';

class ChapterActivitiesPage extends ConsumerWidget {
  final String chapterId;

  const ChapterActivitiesPage({
    super.key,
    required this.chapterId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final versesAsync = ref.watch(versesProvider(chapterId));

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 180,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                'Chapter $chapterId Activities',
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
                      Colors.green.shade700,
                      Colors.green.shade400,
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
                        Icons.psychology_outlined,
                        size: 150,
                        color: Colors.white.withOpacity(0.1),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          
          versesAsync.when(
            data: (verses) {
              if (verses.isEmpty) {
                return SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.info_outline,
                          size: 80,
                          color: Colors.grey[400],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'No verses found',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.grey[600],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return SliverPadding(
                padding: const EdgeInsets.all(16),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final verse = verses[index];
                      return FadeInUp(
                        delay: Duration(milliseconds: 20 * index),
                        duration: const Duration(milliseconds: 250),
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 16.0),
                          child: _VerseActivitySection(
                            verse: verse,
                            chapterId: chapterId,
                          ),
                        ),
                      );
                    },
                    childCount: verses.length,
                  ),
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
                      'Failed to load verses',
                      style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                    ),
                    const SizedBox(height: 8),
                    ElevatedButton.icon(
                      onPressed: () => ref.refresh(versesProvider(chapterId)),
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

class _VerseActivitySection extends ConsumerWidget {
  final Verse verse;
  final String chapterId;

  const _VerseActivitySection({
    required this.verse,
    required this.chapterId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activitiesAsync = ref.watch(
      verseActivitiesProvider((chapterId: chapterId, verseNumber: verse.verseNumber)),
    );

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Verse Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.green.shade50,
                  Colors.green.shade100,
                ],
              ),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(16),
                topRight: Radius.circular(16),
              ),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.green,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    'Verse ${verse.verseNumber}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    verse.translationEnglish,
                    style: TextStyle(
                      fontSize: 13,
                      color: Colors.grey[700],
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),

          // Activities List
          activitiesAsync.when(
            data: (activities) {
              if (activities.isEmpty) {
                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Center(
                    child: Text(
                      'No activities available for this verse',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[500],
                      ),
                    ),
                  ),
                );
              }

              return Column(
                children: activities.map((activity) {
                  return _ActivityListItem(
                    activity: activity,
                    onTap: () {
                      context.push(
                        '/chapter/$chapterId/verse/${verse.verseNumber}/activity/${activity.id}',
                      );
                    },
                  );
                }).toList(),
              );
            },
            loading: () => const Padding(
              padding: EdgeInsets.all(16.0),
              child: Center(
                child: SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(strokeWidth: 2),
                ),
              ),
            ),
            error: (error, stack) => Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Text(
                  'Error loading activities',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.red[300],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ActivityListItem extends StatelessWidget {
  final VerseActivity activity;
  final VoidCallback onTap;

  const _ActivityListItem({
    required this.activity,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: _getActivityColor(activity.type).withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(
                _getActivityIcon(activity.type),
                color: _getActivityColor(activity.type),
                size: 24,
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
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      _InfoChip(
                        icon: Icons.timer_outlined,
                        label: activity.duration,
                        color: Colors.blue,
                      ),
                      const SizedBox(width: 8),
                      _InfoChip(
                        icon: Icons.trending_up,
                        label: activity.difficulty.name.toUpperCase(),
                        color: _getDifficultyColor(activity.difficulty),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: Colors.grey[400],
            ),
          ],
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
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 11, color: color),
          const SizedBox(width: 3),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
