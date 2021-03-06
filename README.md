# Mevent - application for finding and creating events, using Naviaddress API

## Команда
1. Denis Cera (капитан)
2. Roman Hutanu
3. Denis Stolerenco
4. Dima Botezatu

С работами команды можно ознакомиться на сайте - https://webus.md/ 

## Идея
У нашего приложения несколько основных идей:
1. Поиск эвентов рядом с пользователем;
2. Поиск эвентов в заданной области;
3. Создание эвентов;
4. Трекинг друзей по эвентам.


## Решаемые проблемы

Сама по себе идея не нова. Но есть ряд факторов, которые могут помочь приложению выстрелить:

1. **Возможность пользователей самим создавать события.** При широкой распространённости сервиса, это поможет обычным пользователям выходить на свою целевую аудиторию. Например, в моём городе, если у тебя нет денег на рекламу, о твоём эвенте никто и не узнает;

2. Чтобы не пропустить эвент, который тебе интересен, в моём городе нужно постоянно мониторить около пяти сайтов. Наш сервис позволит **агрегировать** всю эту информацию из разных источников в одном месте. В перспективе, не только для какого-то отдельного города, а для всего мира. 
В глобальной перспективе, помимо сугубо информирующей составляющей, я вижу наше приложение, как социальную сеть для совместного посещения эвентов. Представьте рил-тайм отображение друзей на тех или иных мероприятиях, а также формирование ленты аналогично facebook’у, вконтакте и т.д.

## Видео работы приложения
https://youtu.be/Fqm84qmEBwA

## Особенности технической реализации
На данный момент мы не используем ничего сверх того, с помощью чего можно создать прототип:
1. Bulma
2. JS, jQuery

В планах также было сделать Progressive web application, но не успели. В долгосрочной перспективе, возможно vue.js.

С Naviaddress API пока нравится работать, даже несмотря на отсутствие документации. В основном, API используется только для выгрузки/загрузки информации об эвентах. 

## Что сделано
1. Базовая responsive верстка, дизайн;
2. Макеты приложения;
3. Вывод эвентов, находящихся рядом с пользователем с информацией о них;
4. Поиск по эвентам

## Что не успели
1. Сортировки и фильтрации;
2. Логин пользователя;
3. Создание эвентов;
4. Просмотр подробной информации о каждом эвенте;
5. Сделать всё красиво в плане кода :) Кое-что сделано “чтобы работало”, и нуждается в рефакторинге. Прошу сильно не пинать.

## Ссылки
1. Приложение: https://mevent.app 

Чтобы эвенты отображались, нужно их создать рядом с собой тут - https://staging.naviaddress.com/map (как вариант можно использовать сборку с координатами пользователя, установленными рядом с эвентами: https://denischera.info/staticGeo/.) Также работает поиск по эвентам по всей карте.

2. Исходники: https://github.com/Dene33/mevent
3. Макеты: https://www.figma.com/file/Kk2DAhLple9ax0GSLzaS2efC/Navi?node-id=0%3A1
4. Видео: https://youtu.be/Fqm84qmEBwA
