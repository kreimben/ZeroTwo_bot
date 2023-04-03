# shellcheck disable=SC2046

# golang generating
echo `protoc --proto_path="./protobuf" \
--proto_path=protobuf \
--go_out=./src/gen \
--go_opt=paths=source_relative \
--go-grpc_out=./src/gen \
--go-grpc_opt=paths=source_relative \
--proto_path=paths=source_relative \
protobuf/*.proto`