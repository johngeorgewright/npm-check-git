import { Argv, Arguments } from 'yargs'

/**
 * Extracts arguments, from a builder function, in to handler arguments.
 *
 * @example
 * function builder(yargs: Argv) {
 *   return yargs.option(...)
 * }
 * function handler(argv: HandlerArguments<typeof builder>) {
 *   // ...
 * }
 */
export type HandlerArguments<T extends (yargs: Argv) => Argv> = ReturnType<
  T
> extends Argv<infer A>
  ? Arguments<A>
  : never
