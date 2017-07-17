# Wordio RESTful service

## Endpoints

### register

##### In

```javascript
{
    'username': string;
    'password': string;
    'displayName': string;
}
```

##### Out

```javascript
{
    'authToken': string;
}
```

### login

##### In

```javascript
{
    'username': string;
    'password': string;
}
```

##### Out

```javascript
{
    'authToken': string;
}
```

***

### users

##### Out

```javascript
{
    'displayName': string;
}
```

### tiles

##### Out

```javascript
{
    'x': integer;
    'y': integer;
    'value': string;
}
```

### games

##### In

```javascript
{
    'host': User;
    'board': Tile[];
    'availableFrom'?: DateTime;
    'availableUntil'?: DateTime;
}
```

##### Out

```javascript
{
    'host': User;
    'board': Tile[];
    'availableFrom'?: DateTime;
    'availableUntil'?: DateTime;
}
```

### solutions

##### In

```javascript
{
    'game': Game;
    'nickname': string;
    'board': Tile[];
}
```

##### Out

```javascript
{
    'game': Game;
    'nickname': string;
    'board': Tile[];
}
```

