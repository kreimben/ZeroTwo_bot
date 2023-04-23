#!/bin/sh -x

grpcwebproxy --backend_addr=localhost:5011 \
--allow_all_origins --run_tls_server=false --server_http_debug_port=5012 \
--server_http_max_write_timeout=3600s \
--server_http_max_read_timeout=3600s