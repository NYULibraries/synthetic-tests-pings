#!/bin/sh

set -e

if [[ ! -z $1 ]]
then
# . set_env.sh $1
# . init_tf_backend.sh
# terraform apply -auto-approve
  echo 'test'
else
  for test in $(yq -M eval '. | keys' config.yml | sed -e 's/^- //' -e 's/-$//')
  do
    echo $test
  done
# . set_env.sh $1
# . init_tf_backend.sh
# terraform apply -auto-approve
fi

