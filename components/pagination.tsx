import { Button } from "./ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "./ui/select";

type PaginationObject = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PaginationObject;
  handleSetPagination: (pagination: PaginationObject) => void;
  paginatedMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

function Pagination({
  pagination,
  handleSetPagination,
  paginatedMetadata,
}: PaginationProps) {
  /* Note:

  example with page size of 10

page	items skipped (page * size)	start	end	label
0	         0	                      1	    10	1 - 10
1	         10	                      11	20	11 - 20
2	         20	                      21	30	21 - 30


    */
  const startOffSet = pagination.page * pagination.size + 1;
  const endOffSet = startOffSet - 1 + pagination.size;

  const label = `${startOffSet} - ${endOffSet}`;

  function handlePreviousPage() {
    handleSetPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  }
  function handleNextPage() {
    handleSetPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  }
  function handleChangeSize(size: string | null) {
    if (!size) return;
    handleSetPagination({
      ...pagination,
      page: 0,
      size: parseInt(size),
    });
  }
  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePreviousPage}
      disabled={pagination.page <= 0}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      onClick={handleNextPage}
      disabled={!paginatedMetadata.hasNextPage}
    >
      Next
    </Button>
  );

  const sizeButton = (
    <Select
      defaultValue={pagination.size.toString()}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2">5</SelectItem>
        <SelectItem value="5">10</SelectItem>
        <SelectItem value="10">20</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground"> {label}</p>
      <div className=" flex gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}

export { Pagination };
