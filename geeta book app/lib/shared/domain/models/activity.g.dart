// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'activity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ActivityImpl _$$ActivityImplFromJson(Map<String, dynamic> json) =>
    _$ActivityImpl(
      id: json['id'] as String,
      chapterId: json['chapterId'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      type: $enumDecode(_$ActivityTypeEnumMap, json['type']),
      iconUrl: json['iconUrl'] as String,
      isCompleted: json['isCompleted'] as bool? ?? false,
      completionPercentage: (json['completionPercentage'] as num?)?.toInt(),
      lastAccessed: json['lastAccessed'] == null
          ? null
          : DateTime.parse(json['lastAccessed'] as String),
    );

Map<String, dynamic> _$$ActivityImplToJson(_$ActivityImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'chapterId': instance.chapterId,
      'title': instance.title,
      'description': instance.description,
      'type': _$ActivityTypeEnumMap[instance.type]!,
      'iconUrl': instance.iconUrl,
      'isCompleted': instance.isCompleted,
      'completionPercentage': instance.completionPercentage,
      'lastAccessed': instance.lastAccessed?.toIso8601String(),
    };

const _$ActivityTypeEnumMap = {
  ActivityType.read: 'read',
  ActivityType.watch: 'watch',
  ActivityType.experiments: 'experiments',
  ActivityType.listen: 'listen',
  ActivityType.quiz: 'quiz',
  ActivityType.reflection: 'reflection',
  ActivityType.discussion: 'discussion',
  ActivityType.dailyVerse: 'dailyVerse',
};
