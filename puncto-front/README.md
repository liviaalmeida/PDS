# puncto-front

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Run your unit tests

```sh
yarn test:unit
```

### Run your end-to-end tests

```sh
yarn test:e2e
```

### Lints and fixes files

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Common components

### `PtButton`

```html
<PtButton disabled="false|true"
help="Help message under button"
type="button|submit"
@click="regular click event in button">
  Button content
</PtButton>
```

### `PtIcon`

```html
<PtIcon name="name as is in icon assets folder"
@click="regular click event in component">
  Button content
</PtIcon>
```

### `PtInput`

```html
<PtInput disabled="false|true"
icon="name as is in icon assets folder"
label="text above input"
placeholder="input placeholder"
required="false|true"
type="HTML input type or textarea"
v-model>
  Button content
</PtInput>
```

### `PtLogo`

```html
<PtLogo />
```
