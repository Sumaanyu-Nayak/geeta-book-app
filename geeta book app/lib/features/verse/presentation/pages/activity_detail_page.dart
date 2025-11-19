import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:animate_do/animate_do.dart';
import '../../../../shared/domain/models/verse_activity.dart';
import '../providers/verse_activity_provider.dart';

class ActivityDetailPage extends ConsumerWidget {
  final String activityId;

  const ActivityDetailPage({
    super.key,
    required this.activityId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activityAsync = ref.watch(singleActivityProvider(activityId));

    return Scaffold(
      body: activityAsync.when(
        data: (activity) => _ActivityDetailContent(activity: activity),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.error_outline, size: 60, color: Colors.red[300]),
              const SizedBox(height: 16),
              Text(
                'Failed to load activity',
                style: TextStyle(fontSize: 16, color: Colors.grey[600]),
              ),
              const SizedBox(height: 8),
              ElevatedButton.icon(
                onPressed: () => ref.refresh(singleActivityProvider(activityId)),
                icon: const Icon(Icons.refresh),
                label: const Text('Retry'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ActivityDetailContent extends StatefulWidget {
  final VerseActivity activity;

  const _ActivityDetailContent({required this.activity});

  @override
  State<_ActivityDetailContent> createState() => _ActivityDetailContentState();
}

class _ActivityDetailContentState extends State<_ActivityDetailContent> {
  int _currentStep = 0;
  final Set<int> _completedSteps = {};

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        // App Bar
        SliverAppBar(
          expandedHeight: 200,
          pinned: true,
          flexibleSpace: FlexibleSpaceBar(
            title: Text(
              widget.activity.title,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white,
                fontSize: 16,
              ),
            ),
            background: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    _getActivityColor(widget.activity.type),
                    _getActivityColor(widget.activity.type).withOpacity(0.7),
                  ],
                ),
              ),
              child: Stack(
                children: [
                  Positioned(
                    right: -30,
                    top: 50,
                    child: Icon(
                      _getActivityIcon(widget.activity.type),
                      size: 150,
                      color: Colors.white.withOpacity(0.2),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),

        // Content
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Info Cards
                FadeInUp(
                  delay: const Duration(milliseconds: 50),
                  child: Row(
                    children: [
                      Expanded(
                        child: _InfoCard(
                          icon: Icons.timer_outlined,
                          label: 'Duration',
                          value: widget.activity.duration,
                          color: Colors.blue,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _InfoCard(
                          icon: Icons.trending_up,
                          label: 'Difficulty',
                          value: widget.activity.difficulty.name.toUpperCase(),
                          color: _getDifficultyColor(widget.activity.difficulty),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 24),

                // Description
                FadeInUp(
                  delay: const Duration(milliseconds: 100),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'About this Activity',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        widget.activity.description,
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey[700],
                          height: 1.6,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 32),

                // Instructions
                FadeInUp(
                  delay: const Duration(milliseconds: 150),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Text(
                            'Step-by-Step Instructions',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Spacer(),
                          Text(
                            '${_completedSteps.length}/${widget.activity.instructions.length}',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey[600],
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      ...widget.activity.instructions.asMap().entries.map(
                        (entry) {
                          final index = entry.key;
                          final instruction = entry.value;
                          return _InstructionStep(
                            step: instruction.step,
                            description: instruction.description,
                            isCompleted: _completedSteps.contains(index),
                            isCurrent: _currentStep == index,
                            onToggle: () {
                              setState(() {
                                if (_completedSteps.contains(index)) {
                                  _completedSteps.remove(index);
                                } else {
                                  _completedSteps.add(index);
                                  if (_currentStep == index && 
                                      _currentStep < widget.activity.instructions.length - 1) {
                                    _currentStep++;
                                  }
                                }
                              });
                            },
                          );
                        },
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 32),

                // Benefits
                FadeInUp(
                  delay: const Duration(milliseconds: 200),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Benefits',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      ...widget.activity.benefits.map(
                        (benefit) => Padding(
                          padding: const EdgeInsets.only(bottom: 12.0),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                margin: const EdgeInsets.only(top: 4),
                                padding: const EdgeInsets.all(4),
                                decoration: BoxDecoration(
                                  color: Colors.green.withOpacity(0.1),
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(
                                  Icons.check,
                                  color: Colors.green,
                                  size: 16,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Text(
                                  benefit,
                                  style: TextStyle(
                                    fontSize: 15,
                                    color: Colors.grey[700],
                                    height: 1.5,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 32),

                // Action Button
                FadeInUp(
                  delay: const Duration(milliseconds: 250),
                  child: SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _completedSteps.length == widget.activity.instructions.length
                          ? () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('🎉 Activity completed! Great work!'),
                                  backgroundColor: Colors.green,
                                ),
                              );
                            }
                          : null,
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        backgroundColor: _getActivityColor(widget.activity.type),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: Text(
                        _completedSteps.length == widget.activity.instructions.length
                            ? 'Mark as Completed'
                            : 'Complete All Steps First',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 32),
              ],
            ),
          ),
        ),
      ],
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

class _InfoCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _InfoCard({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 32),
          const SizedBox(height: 8),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: color,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _InstructionStep extends StatelessWidget {
  final int step;
  final String description;
  final bool isCompleted;
  final bool isCurrent;
  final VoidCallback onToggle;

  const _InstructionStep({
    required this.step,
    required this.description,
    required this.isCompleted,
    required this.isCurrent,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            onTap: onToggle,
            child: Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: isCompleted
                    ? Colors.green
                    : isCurrent
                        ? Theme.of(context).colorScheme.primary
                        : Colors.grey[300],
                shape: BoxShape.circle,
              ),
              child: Center(
                child: isCompleted
                    ? const Icon(Icons.check, color: Colors.white, size: 20)
                    : Text(
                        step.toString(),
                        style: TextStyle(
                          color: isCurrent ? Colors.white : Colors.grey[600],
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: GestureDetector(
              onTap: onToggle,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isCompleted
                      ? Colors.green.withOpacity(0.05)
                      : isCurrent
                          ? Theme.of(context).colorScheme.primary.withOpacity(0.05)
                          : Colors.grey[50],
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isCompleted
                        ? Colors.green.withOpacity(0.3)
                        : isCurrent
                            ? Theme.of(context).colorScheme.primary.withOpacity(0.3)
                            : Colors.grey[300]!,
                  ),
                ),
                child: Text(
                  description,
                  style: TextStyle(
                    fontSize: 15,
                    color: isCompleted ? Colors.grey[600] : Colors.grey[800],
                    decoration: isCompleted ? TextDecoration.lineThrough : null,
                    height: 1.5,
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
