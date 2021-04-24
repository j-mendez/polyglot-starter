#!/bin/bash

apk update \
	&& apk add jq curl \
	&& rm -rf /var/cache/apk/*