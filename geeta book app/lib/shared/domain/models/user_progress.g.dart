// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_progress.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$UserProgressImpl _$$UserProgressImplFromJson(Map<String, dynamic> json) =>
    _$UserProgressImpl(
      userId: json['userId'] as String,
      totalChaptersCompleted: (json['totalChaptersCompleted'] as num).toInt(),
      totalVersesCompleted: (json['totalVersesCompleted'] as num).toInt(),
      totalActivitiesCompleted:
          (json['totalActivitiesCompleted'] as num).toInt(),
      chapterProgress: (json['chapterProgress'] as Map<String, dynamic>?)?.map(
            (k, e) => MapEntry(
                k, ChapterProgress.fromJson(e as Map<String, dynamic>)),
          ) ??
          const {},
      lastUpdated: json['lastUpdated'] == null
          ? null
          : DateTime.parse(json['lastUpdated'] as String),
    );

Map<String, dynamic> _$$UserProgressImplToJson(_$UserProgressImpl instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'totalChaptersCompleted': instance.totalChaptersCompleted,
      'totalVersesCompleted': instance.totalVersesCompleted,
      'totalActivitiesCompleted': instance.totalActivitiesCompleted,
      'chapterProgress': instance.chapterProgress,
      'lastUpdated': instance.lastUpdated?.toIso8601String(),
    };

_$ChapterProgressImpl _$$ChapterProgressImplFromJson(
        Map<String, dynamic> json) =>
    _$ChapterProgressImpl(
      chapterId: json['chapterId'] as String,
      versesCompleted: (json['versesCompleted'] as num).toInt(),
      totalVerses: (json['totalVerses'] as num).toInt(),
      activitiesCompleted: (json['activitiesCompleted'] as num).toInt(),
      totalActivities: (json['totalActivities'] as num).toInt(),
      isCompleted: json['isCompleted'] as bool? ?? false,
      completedAt: json['completedAt'] == null
          ? null
          : DateTime.parse(json['completedAt'] as String),
    );

Map<String, dynamic> _$$ChapterProgressImplToJson(
        _$ChapterProgressImpl instance) =>
    <String, dynamic>{
      'chapterId': instance.chapterId,
      'versesCompleted': instance.versesCompleted,
      'totalVerses': instance.totalVerses,
      'activitiesCompleted': instance.activitiesCompleted,
      'totalActivities': instance.totalActivities,
      'isCompleted': instance.isCompleted,
      'completedAt': instance.completedAt?.toIso8601String(),
    };
