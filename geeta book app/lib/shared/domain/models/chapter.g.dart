// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'chapter.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ChapterImpl _$$ChapterImplFromJson(Map<String, dynamic> json) =>
    _$ChapterImpl(
      id: json['id'] as String,
      number: (json['number'] as num).toInt(),
      titleSanskrit: json['titleSanskrit'] as String,
      titleEnglish: json['titleEnglish'] as String,
      titleHindi: json['titleHindi'] as String,
      description: json['description'] as String,
      verseCount: (json['verseCount'] as num).toInt(),
      imageUrl: json['imageUrl'] as String,
      videoUrl: json['videoUrl'] as String?,
      keyThemes: (json['keyThemes'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      isCompleted: json['isCompleted'] as bool? ?? false,
      completedActivities: (json['completedActivities'] as num?)?.toInt() ?? 0,
      totalActivities: (json['totalActivities'] as num?)?.toInt() ?? 0,
    );

Map<String, dynamic> _$$ChapterImplToJson(_$ChapterImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'number': instance.number,
      'titleSanskrit': instance.titleSanskrit,
      'titleEnglish': instance.titleEnglish,
      'titleHindi': instance.titleHindi,
      'description': instance.description,
      'verseCount': instance.verseCount,
      'imageUrl': instance.imageUrl,
      'videoUrl': instance.videoUrl,
      'keyThemes': instance.keyThemes,
      'isCompleted': instance.isCompleted,
      'completedActivities': instance.completedActivities,
      'totalActivities': instance.totalActivities,
    };
