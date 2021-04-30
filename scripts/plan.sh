#!/bin/sh

set -e

. set_env.sh $1

. init_tf_backend.sh

terraform plan