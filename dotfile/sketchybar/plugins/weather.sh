sketchybar --set $NAME \
  label="Loading..." \
  icon.color=0xff5edaff \

# fetch weather data
LOCATION="Dalian"
REGION=""
LANG="zh"

# Line below replaces spaces with +
LOCATION_ESCAPED="${LOCATION// /+}+${REGION// /+}"
WEATHER_JSON=$(curl -s "https://wttr.in/$LOCATION_ESCAPED?0pq&format=j1&lang=$LANG" | iconv -f utf-8 -t utf-8)

# Fallback if empty
if [ -z "$WEATHER_JSON" ]; then
  sketchybar --set $NAME label="$LOCATION"
  return
fi

TEMPERATURE=$(echo "$WEATHER_JSON" | jq '.current_condition[0].temp_C' | tr -d '"')

if echo "$WEATHER_JSON" | jq -e '.current_condition[0].lang_zh[0].value' >/dev/null; then
    WEATHER_DESCRIPTION=$(echo "$WEATHER_JSON" | jq '.current_condition[0].lang_zh[0].value' | tr -d '"')
else
    WEATHER_DESCRIPTION="数据不可用"
fi

sketchybar --set $NAME \
  label="$TEMPERATURE$(echo '°')C • $WEATHER_DESCRIPTION" \
  label.font="SF Pro:Semibold:12.0"
