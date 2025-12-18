
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWiki } from "@/contexts/wiki-context";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useEasterEgg } from "@/contexts/easter-egg-context";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { searchEntries, categories } = useWiki();
  const navigate = useNavigate();
  const { isEntryUnlocked } = useEasterEgg();

  // Show all results, locked ones will be greyed out and non-clickable in the UI
  const results = searchEntries(value);

  function getCategoryColor(category: string) {
    switch (category) {
      case "character": return "wiki-category-character";
      case "power": return "wiki-category-power";
      case "location": return "wiki-category-location";
      case "equipment": return "wiki-category-equipment";
      case "faction": return "wiki-category-faction";
      default: return "";
    }
  }

  function getCategoryLabel(categoryType: string) {
    const category = categories.find(c => c.type === categoryType);
    return category ? category.label : categoryType;
  }

  return (
    <div className="relative w-full max-w-2xl">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for entries..."
              className="pl-10 pr-10"
              onClick={() => setOpen(true)}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start" sideOffset={5} alignOffset={-10}>
          <Command>
            <CommandInput 
              placeholder="Search for entries..." 
              value={value}
              onValueChange={setValue}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup>
                  {results.map((entry) => {
                    const isLocked = !isEntryUnlocked(entry.id);
                    return (
                      <CommandItem
                        key={entry.id}
                        className={isLocked ? "flex items-center justify-between opacity-50 grayscale cursor-not-allowed" : "flex items-center justify-between"}
                        onSelect={() => {
                          if (!isLocked) {
                            navigate(`/entry/${entry.id}`);
                            setOpen(false);
                            setValue("");
                          }
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{entry.title}</span>
                          <span className="text-xs text-muted-foreground">{entry.description}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(entry.category)}`}>
                          {getCategoryLabel(entry.category)}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
