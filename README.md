# gol-cli

> Visualize Conway's Game of life from the comfort of your terminal
![](https://user-images.githubusercontent.com/8050949/102924994-99093a00-4460-11eb-98d1-6230d51d2722.gif?raw=true)


## Install

```bash
$ npm install --global gol-cli
```


## CLI

```
$ gol --help

	Usage
	  $ gol

	Options
		--cellColor  Cell color
		--bgColor  Background color
		--template  Starting pattern (glider, pulsar, gosper), default is random

	Examples
    $ gol --cellColor=magenta --template=pulsar
```

### Contribution

I'm mainly looking to add new templates, so if you know of a cool new game of life pattern add it to the
templates file and submit a pull request. Thank you :)
