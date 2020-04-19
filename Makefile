build:
	echo [Build] KU image version:$(tag)
	docker build -t ku/attendanceku:$(tag) .

push:
	echo [Push] KU image version:$(tag) 
	docker push ku/attendanceku:$(tag)

both: 
	make build tag=$(tag) && make push tag=$(tag)

default: both
