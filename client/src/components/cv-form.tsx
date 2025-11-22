import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvDataSchema } from "@shared/schema";
import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";

interface CVFormProps {
  initialData: {
    templateId: string;
    personalInfo: PersonalInfo;
    experience: ExperienceEntry[];
    education: EducationEntry[];
    skills: string[];
  };
  onUpdate: (data: z.infer<typeof cvDataSchema>) => void;
}

export function CVForm({ initialData, onUpdate }: CVFormProps) {
  const form = useForm<z.infer<typeof cvDataSchema>>({
    resolver: zodResolver(cvDataSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const formData = watch();

  // Update parent whenever form changes
  form.watch((data) => {
    if (data) {
      onUpdate(data as z.infer<typeof cvDataSchema>);
    }
  });

  const addExperience = () => {
    const newExp: ExperienceEntry = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setValue("experience", [...formData.experience, newExp]);
  };

  const removeExperience = (id: string) => {
    setValue("experience", formData.experience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const newEdu: EducationEntry = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setValue("education", [...formData.education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setValue("education", formData.education.filter(e => e.id !== id));
  };

  const addSkill = () => {
    setValue("skills", [...formData.skills, ""]);
  };

  const removeSkill = (index: number) => {
    setValue("skills", formData.skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setValue("skills", newSkills);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="personalInfo.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} data-testid="input-fullname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="personalInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personalInfo.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York, NY" {...field} data-testid="input-location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="personalInfo.summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief overview of your professional background and goals..." 
                      className="resize-none min-h-24"
                      {...field} 
                      data-testid="input-summary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl">Work Experience</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addExperience}
              className="gap-2"
              data-testid="button-add-experience"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="space-y-4">
                {index > 0 && <Separator />}
                <div className="flex items-start justify-between gap-2 pt-2">
                  <Badge variant="secondary">Experience {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(exp.id)}
                    data-testid={`button-remove-experience-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} data-testid={`input-position-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Corp" {...field} data-testid={`input-company-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} data-testid={`input-exp-start-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field} 
                            disabled={formData.experience[index]?.current}
                            data-testid={`input-exp-end-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`experience.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid={`checkbox-current-${index}`}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        I currently work here
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your responsibilities and achievements..."
                          className="resize-none min-h-20"
                          {...field}
                          data-testid={`input-exp-description-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {formData.experience.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No experience added yet</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addExperience}
                  className="mt-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Experience
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl">Education</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addEducation}
              className="gap-2"
              data-testid="button-add-education"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="space-y-4">
                {index > 0 && <Separator />}
                <div className="flex items-start justify-between gap-2 pt-2">
                  <Badge variant="secondary">Education {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEducation(edu.id)}
                    data-testid={`button-remove-education-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.school`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School/University</FormLabel>
                        <FormControl>
                          <Input placeholder="University Name" {...field} data-testid={`input-school-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor of Science" {...field} data-testid={`input-degree-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} data-testid={`input-edu-start-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field} 
                            disabled={formData.education[index]?.current}
                            data-testid={`input-edu-end-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`education.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid={`checkbox-edu-current-${index}`}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Currently studying here
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Relevant coursework, achievements, activities..."
                          className="resize-none min-h-16"
                          {...field}
                          data-testid={`input-edu-description-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {formData.education.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No education added yet</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addEducation}
                  className="mt-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Education
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl">Skills</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addSkill}
              className="gap-2"
              data-testid="button-add-skill"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g., JavaScript, Project Management"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  data-testid={`input-skill-${index}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(index)}
                  data-testid={`button-remove-skill-${index}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {formData.skills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No skills added yet</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addSkill}
                  className="mt-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Skill
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
