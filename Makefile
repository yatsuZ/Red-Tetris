# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: yzaoui <yzaoui@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2026/04/09 18:00:02 by yzaoui            #+#    #+#              #
#    Updated: 2026/04/09 18:00:03 by yzaoui           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

.PHONY: all help install

SHELL := /bin/bash

GREEN   = \033[1;32m
BLUE    = \033[1;34m
YELLOW  = \033[1;33m
RED     = \033[1;31m
NC      = \033[0m

PORT             = 3000
PROJECT_NAME     = red_tetris
CODE_DIR         = ./code
NODE_MODULE_PATH = $(CODE_DIR)/node_modules

all: help

install:
	@pnpm install --prefix "$(CODE_DIR)"

dev:
	@pnpm --prefix "$(CODE_DIR)" run dev:server

# lance les tests (faire 70% du code)
# test:

# compile pour la production
# build:

# supprime node_modules
# clean:

help:
	@echo -e "Makefile - $(PROJECT_NAME)"
	@echo ""
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Run application, en dev"
	@echo "  make install     - Install dependencies"
	@echo "  make build       - compile pour la production"
	@echo "  make clean       - supprime node_modules"
