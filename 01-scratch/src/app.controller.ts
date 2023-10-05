import { Controller, Get } from "@nestjs/common";

@Controller("/app")
// @Controller()
export class AppController {
  //   @Get("/asdf")
  @Get()
  getRootRoute() {
    return "Hello World!";
  }

  @Get("/bye")
  getByeThere() {
    return "Bye!";
  }
}
