#!/bin/bash

set -e

# === CONFIG ===
UPLOAD_URL="https://ota-update.csctech.vn/upload"
PUBLISH_URL="https://ota-update.csctech.vn/content-manager/collection-types/api::android.android/emdtrku91s5hq9dvj9i6ojlw/actions/publish"
ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU3MzI3NTY4LCJleHAiOjE3NTk5MTk1Njh9.cMEh7tWPexKl0DKB3HO2hfDKpv2wQLHiG4OeSjyspmA"
NOTE="AppDemo"

# === PROMPT VERSION ===
read -p "🔢 Nhập version cho Android (ví dụ: 1.0.1): " TARGET_VERSION

# === BUILD ===
echo "🔧 Bundling Android..."

mkdir -p android/output
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/output/index.android.bundle \
  --assets-dest android/output \
  --sourcemap-output android/sourcemap.js

cd android
find output -type f | zip index.android.bundle.zip -@
cd ..

rm -rf android/output android/sourcemap.js

# === UPLOAD ===
echo "📡 Uploading Android bundle to Strapi..."

UPLOAD_RESPONSE=$(curl -s -X POST "$UPLOAD_URL" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "files=@android/index.android.bundle.zip" \
  -F "fileInfo={\"name\":\"index.android.bundle.zip\",\"folder\":null}")

echo "📄 UPLOAD_RESPONSE: $UPLOAD_RESPONSE"

DOCUMENT_ID=$(echo "$UPLOAD_RESPONSE" | jq -r 'if type == "array" then .[0].documentId else empty end')
FILE_ID=$(echo "$UPLOAD_RESPONSE" | jq -r 'if type == "array" then .[0].id else empty end')

if [ -z "$DOCUMENT_ID" ] || [ -z "$FILE_ID" ]; then
  echo "❌ Không thể lấy ID từ phản hồi upload. Dừng lại."
  exit 1
fi

echo "✅ Uploaded. File ID: $FILE_ID, Document ID: $DOCUMENT_ID"

# === PUBLISH ===
echo "🚀 Publishing Android version $TARGET_VERSION..."

curl -s -X POST "$PUBLISH_URL" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"note\": \"$NOTE\",
    \"targetVersion\": \"$TARGET_VERSION\",
    \"enable\": true,
    \"required\": true,
    \"bundle\": [{
      \"id\": $FILE_ID,
      \"documentId\": \"$DOCUMENT_ID\",
      \"name\": \"index.android.bundle.zip\"
    }]
  }" > /dev/null

echo "🎉 Android OTA upload & publish complete (version $TARGET_VERSION)!"
