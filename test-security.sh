# API Security Testing Script

echo "🔒 Testing API Security Features"
echo "=================================="
echo ""

# Configuration
API_URL="http://localhost:3000"

echo "📋 Test 1: Normal Request (should succeed)"
echo "-------------------------------------------"
curl -X GET "${API_URL}/api/models-dropdown" \
  -H "Origin: http://localhost:3000" \
  -w "\nStatus: %{http_code}\n" \
  -s -o /dev/null
echo ""

echo "📋 Test 2: CORS Protection (should fail with 403)"
echo "-------------------------------------------------"
curl -X GET "${API_URL}/api/models-dropdown" \
  -H "Origin: https://evil-website.com" \
  -w "\nStatus: %{http_code}\n" \
  -s -o /dev/null
echo ""

echo "📋 Test 3: Rate Limiting (should fail after 20 requests)"
echo "--------------------------------------------------------"
for i in {1..25}; do
  STATUS=$(curl -X GET "${API_URL}/api/models-dropdown" \
    -H "Origin: http://localhost:3000" \
    -w "%{http_code}" \
    -s -o /dev/null)
  echo "Request $i: Status $STATUS"
  if [ "$STATUS" = "429" ]; then
    echo "✅ Rate limit triggered at request $i"
    break
  fi
done
echo ""

echo "📋 Test 4: Invalid Content-Type (should fail with 400)"
echo "------------------------------------------------------"
curl -X POST "${API_URL}/api/predict" \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: text/plain" \
  -d "invalid data" \
  -w "\nStatus: %{http_code}\n" \
  -s -o /dev/null
echo ""

echo "📋 Test 5: Invalid Input - Missing text (should fail with 400)"
echo "--------------------------------------------------------------"
curl -X POST "${API_URL}/api/predict" \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"model":"mt5"}' \
  -w "\nStatus: %{http_code}\n" \
  -s -o /dev/null
echo ""

echo "📋 Test 6: Invalid Input - Invalid model (should fail with 400)"
echo "---------------------------------------------------------------"
curl -X POST "${API_URL}/api/predict" \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"text":"test","model":"invalid"}' \
  -w "\nStatus: %{http_code}\n" \
  -s -o /dev/null
echo ""

echo "📋 Test 7: Valid POST Request (should succeed)"
echo "----------------------------------------------"
curl -X POST "${API_URL}/api/predict" \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"text":"สวัสดี","model":"mt5"}' \
  -w "\nStatus: %{http_code}\n" \
  -s
echo ""

echo "✅ Security Testing Complete!"
