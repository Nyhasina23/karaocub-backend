## Karaocub REST API docs

#### > upload video

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>http://localhost:8080/api/videos/create</code></summary>

##### Parameters (form-data)

> | type\*                   | video\*    | duration\* | eventId\* |
> | ------------------------ | ---------- | ---------- | --------- |
> | string: "GOLD" / "GUEST" | file(.mp4) | string     | string    |

##### Responses

> | http code | content-type               | response                                             |
> | --------- | -------------------------- | ---------------------------------------------------- |
> | `201`     | `text/plain;charset=UTF-8` | `video created`                                      |
> | `400`     | `application/json`         | `{"code":"400","message":"Bad Request"}`             |
> | `403`     | `application/json`         | `{"code":"403","message":"Insufficient parameters"}` |
> | `500`     | `text/html;charset=utf-8`  | Unexpected error while creating video                |

---
