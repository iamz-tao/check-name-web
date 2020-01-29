build:
	echo [Build] Spotme image version:$(tag)
	docker build -t metromercespotme/spotme:$(tag) .

push:
	echo [Push] Spotme image version:$(tag) 
	docker push metromercespotme/spotme:$(tag)

both: 
	make build tag=$(tag) && make push tag=$(tag)

default: both
