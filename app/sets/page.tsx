"use client";
import { useState, useEffect, useRef } from "react";
import SetCard from "@/components/SetCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Set {
  card_count?: number;
  abbreviation: string;
  icon: string;
  id?: string;
  name: string;
  parent_set_code?: string;
  releaseDate: string;
  set_type: string;
  tags: string[];
  type: string;
}

const SetsPage = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [sortedSets, setSortedSets] = useState<Set[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [sortOption, setSortOption] = useState<"name" | "releaseDate">(
    "releaseDate"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [tags, setTags] = useState<string[]>([
    "New",
    "Core",
    "Draft Innovation",
    "Expansion",
    "Masters",
  ]);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const fetchSets = async () => {
    try {
      const res = await fetch("/api/fetchSets");
      if (!res.ok) {
        throw new Error("Response failed with status " + res.status);
      }
      const data = await res.json();
      const badSetTypes = [
        "commander",
        "promo",
        "token",
        "memorabilia",
        "alchemy",
        "masterpiece",
        "minigame",
        "funny",
        "box",
        "arsenal",
        "duel_deck",
        "spellbook",
        "planechase",
        "from_the_vault",
        "archenemy",
        "starter",
        "premium_deck",
        "vanguard",
      ];
      const date = new Date();
      const mappedSets = data
        .map((set: Set) => ({
          name: set.name,
          abbreviation: set.abbreviation,
          icon: set.icon,
          releaseDate: set.releaseDate,
          type: set.tags[0],
        }))
        .filter(
          (set: {
            type: string;
            digital?: boolean;
            releaseDate: string;
          }) =>
            !badSetTypes.includes(set.type) &&
            !set.digital &&
            new Date(set.releaseDate) <= date
        );

      setSets(mappedSets);
      setSortedSets(mappedSets);
      setLoading(false);
    } catch (error: any) {
      console.error("Fetching error:", error);
      setError(error.message);
      setLoading(false);
      setTags([]);
    }
  };

  useEffect(() => {
    fetchSets();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowercaseTerm = term.toLowerCase();
    const filtered = sets.filter(
      (set) =>
        set.name.toLowerCase().includes(lowercaseTerm) ||
        set.abbreviation.toLowerCase().includes(lowercaseTerm)
    );
    setSortedSets(filtered);
  };

  const handleSort = (
    option: "name" | "releaseDate",
    order: "asc" | "desc"
  ) => {
    setSortOption(option);
    setSortOrder(order);
    const sorted = [...sortedSets].sort((a, b) => {
      let comparison = 0;
      if (option === "name") {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison =
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      }
      return order === "asc" ? comparison : -comparison;
    });
    setSortedSets(sorted);
  };

  const toggleDropdown = () => setFiltersOpen((prev) => !prev);

  // Apply filters to sets
  useEffect(() => {
    let filteredSets = sets;

    if (filters.length > 0) {
      filteredSets = sets.filter((set) => filters.includes(set.type));
    }

    // Apply search term
    if (searchTerm) {
      const lowercaseTerm = searchTerm.toLowerCase();
      filteredSets = filteredSets.filter(
        (set) =>
          set.name.toLowerCase().includes(lowercaseTerm) ||
          set.abbreviation.toLowerCase().includes(lowercaseTerm)
      );
    }

    // Apply sorting
    const sorted = [...filteredSets].sort((a, b) => {
      let comparison = 0;
      if (sortOption === "name") {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison =
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setSortedSets(sorted);
  }, [filters, searchTerm, sortOption, sortOrder, sets]);

  if (loading) {
    return (
      <div className="flex flex-col items-center w-screen justify-center min-h-screen bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
        <div className="loader mb-4"></div>
        <p className="text-2xl font-bold">Fetching sets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-pink-900 text-white">
        <AlertTriangle className="h-20 w-20 text-yellow-500 mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
        <p className="text-lg mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-600 transition-colors"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-16 px-6 min-h-screen w-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the MTG Pack Simulator!
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/2 bg-gray-800 border border-gray-700 text-white rounded-md px-4">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
                type="text"
                placeholder="Search sets by name or code"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-gray-800 text-white"
            />
        </div>
        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Filters Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-gray-800 border-gray-700 text-white"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {filtersOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            {filtersOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                <div className="p-4 space-y-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${index}`}
                        checked={filters.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters((prev) => [...prev, tag]);
                          } else {
                            setFilters((prev) =>
                              prev.filter((selectedTag) => selectedTag !== tag)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`tag-${index}`}
                        className="text-sm font-normal text-white"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Sort Options */}
          <Select
            value={sortOption}
            onValueChange={(value) =>
              handleSort(value as "name" | "releaseDate", sortOrder)
            }
          >
            <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className='bg-gray-800 border border-gray-700'>
              <SelectGroup>
                <SelectLabel className='text-muted-foreground'>Sort By</SelectLabel>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="releaseDate">Release Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={sortOrder}
            onValueChange={(value) =>
              handleSort(sortOption, value as "asc" | "desc")
            }
          >
            <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent className='bg-gray-800 border border-gray-700'>
              <SelectGroup>
                <SelectLabel className="text-muted-foreground">Sort Order</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Sets Grid */}
      <div className="">
        {sortedSets.map((set, index) => (
          <SetCard
            key={index}
            name={set.name}
            abbreviation={set.abbreviation}
            icon={set.icon}
            tags={set.tags}
            releaseDate={set.releaseDate}
            type={set.type}
          />
        ))}
      </div>
    </div>
  );
};

export default SetsPage;
