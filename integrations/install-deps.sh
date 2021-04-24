#!/bin/bash


if which jq >/dev/null; then
    echo
else
  apk update \
	&& apk add jq curl \
	&& rm -rf /var/cache/apk/*
fi