EMAIL=${1:-test@test.test}
TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjAsInRva2VuVHlwZSI6IkFJRkkiLCJzaG9wIjoicHVibGljLXNhbmRib3giLCJpYXQiOjE2NDMwNDE1MjV9.dpChGE79zrB9NTzpRmw7M44f6ucrzxKlv2_kfe5slEQ
BODY=`cat <<EOM
{
    "email": "$EMAIL",
    "password": "123456789"
}
EOM
`
curl \
    -X POST \
    -H "Content-type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$BODY" \
    'https://oasis-api.public-sandbox.client.aifi.io/api/admin/v2/customers'
