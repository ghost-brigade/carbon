import { UnprocessableEntityException } from "@nestjs/common";

type SortOrder = "asc" | "desc";

function isSortOrder(order: string): order is SortOrder {
  return ["asc", "desc"].includes(order);
}

function getOrder(order: string) {
  return order.split(",").reduce<Record<string, SortOrder>>((acc, field) => {
    const [key, order] = field.split(":");

    if (!isSortOrder(order)) {
      throw new UnprocessableEntityException("Invalid orderBy parameter");
    }

    acc[key] = order;

    return acc;
  }, Object.create(null));
}

export default getOrder;
