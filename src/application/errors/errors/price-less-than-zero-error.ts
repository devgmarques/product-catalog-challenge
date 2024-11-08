import { UseCaseError } from "../use-case-error"

export class PriceLessThanZero extends Error implements UseCaseError {
  constructor () {
    super("The price must be a number greater than zero.")
  }
}