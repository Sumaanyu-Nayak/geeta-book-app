// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'verse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$VerseImpl _$$VerseImplFromJson(Map<String, dynamic> json) => _$VerseImpl(
      id: json['id'] as String,
      chapterId: json['chapterId'] as String,
      verseNumber: (json['verseNumber'] as num).toInt(),
      textSanskrit: json['textSanskrit'] as String,
      textTransliteration: json['textTransliteration'] as String,
      translationEnglish: json['translationEnglish'] as String,
      translationHindi: json['translationHindi'] as String,
      explanation: json['explanation'] as String,
      videoUrl: json['videoUrl'] as String?,
      audioUrl: json['audioUrl'] as String?,
      images: (json['images'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      isCompleted: json['isCompleted'] as bool? ?? false,
      completedAt: json['completedAt'] == null
          ? null
          : DateTime.parse(json['completedAt'] as String),
    );

Map<String, dynamic> _$$VerseImplToJson(_$VerseImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'chapterId': instance.chapterId,
      'verseNumber': instance.verseNumber,
      'textSanskrit': instance.textSanskrit,
      'textTransliteration': instance.textTransliteration,
      'translationEnglish': instance.translationEnglish,
      'translationHindi': instance.translationHindi,
      'explanation': instance.explanation,
      'videoUrl': instance.videoUrl,
      'audioUrl': instance.audioUrl,
      'images': instance.images,
      'isCompleted': instance.isCompleted,
      'completedAt': instance.completedAt?.toIso8601String(),
    };
