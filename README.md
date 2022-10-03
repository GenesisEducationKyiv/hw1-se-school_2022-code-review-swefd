# GSES2 BTC application

An API for sending an email to all subscribed users of the current exchange rate of BTC/UAH (Bitcoin to the Ukrainian
hryvnia).

Uses the Binance API.

## Authors

- [@Oleksandr Chornous](https://github.com/swefd)

## Architecture

![Architecture](https://raw.githubusercontent.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd/master/demo/architecture.png)

## Config variables

To run this project, you will **need to add/change** the following variables in `./config/config.json` file.

#### App variables:

* `port` - Express server port
* `fakeSMTP` - `true` for using [Fake SMTP Mailtrap](https://mailtrap.io/), `false` - for sending real emails
  with [Sendinblue](https://sendinblue.com) (Limit 300 emails per day)

#### In case of usage [Fake SMTP Mailtrap](https://mailtrap.io/), change following Variables :

* `host` - SMTP server address

* `port` - SMTP server port

* `user` - username

* `pass` - password

#### In case of usage [Sendinblue](https://sendinblue.com), change following Variables :

* `API_KEY` - Paste here your own api key :)

* `host` - SMTP server address

* `port` - SMTP server port

* `from` - Sender email

#### DB Variables:

* `path` - Path to the `db.txt` file

## API Reference

* Server port : 8080

### Get BTC/UAH rate

```
  GET /api/rate
```

* No parameters

#### Responses

`Integer` BTC/UAH rate

### Subscribe an email

```
  POST /api/subscribe
```

| Parameter |   Type   |    Description     |
|:---------:|:--------:|:------------------:|
|  `email`  | `string` | **Email address**. |

*form-data parameters

#### -> Responses

* Status: 200 OK

```json
{
  "message": "test@gmail.com successfully subscribed"
}
```

* Status: 409 Conflict

```json
{
  "message": "test@gmail.com  already subscribed"
}
```

### Send email to all subscribers

```
  POST /api/sendEmails
```

* No parameters

#### -> Responses

* Status: 200 OK

```json
{
  "message": "All Emails were sent successfully"
}
```

## DEMO

### Email

![EMAIL](https://raw.githubusercontent.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd/master/demo/email.png)

### API getRate

![EMAIL](https://raw.githubusercontent.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd/master/demo/getRate.png)

### API subscribe

![EMAIL](https://raw.githubusercontent.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd/master/demo/subscribe.png)

### API sendEmails

![EMAIL](https://raw.githubusercontent.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd/master/demo/sendEmails.png)

## Run in Docker

Clone the project

```bash
  git clone https://github.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd
```

Go to the project directory

```bash
  cd gses2
```

Build image

```bash
  docker build -t swefd:gses2 . 
```

Run container

```bash
  docker run --name gses2 -p 8080:8080/tcp -d swefd:gses2
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-swefd
```

Go to the project directory

```bash
  cd gses2
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


